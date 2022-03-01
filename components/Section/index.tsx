import { ReactElement, useState, useEffect } from 'react';
import { NoSsr } from '../Utils/NoSsr';
import ReactTooltip from 'react-tooltip';

import dynamic from 'next/dynamic';

import cN from 'classnames';
import s from './style.module.scss';
import {
  getLeftLayout,
  getRightLayout,
  getOverrideLayout,
} from './style.utlis';

import { EditSection } from './EditSection';
import { EditElement } from './EditElement';
import { DirectusImage } from '../Utils/DirectusImage';
import { SectionWrapper } from './SectionWrapper';
import { SectionsText } from './SectionsText';

export type Layout = '100' | '75-25' | '50-50' | '25-75';

export type OverrideLayout = '100' | '75' | '50' | '25' | null;

export type Align = 'left' | 'right' | 'center' | null;

export type ColorScheme =
  | 'colorSchemeAqua'
  | 'colorSchemeViolet'
  | 'colorSchemeWhite'
  | 'colorSchemeRed';

export type Section = {
  id: string;
  title: string;
  sort: number | null;
  status: string;
  elements: number[];
  render: Element[];
  colorScheme: ColorScheme;
  layout: Layout;
};

export type Element = {
  id: string;
  title: string;
  content: string;
  image: string;
  component: string;
  collection: string;
  sort: number | null;
  overrideLayout: string | null;
  edit?: boolean;
  index: number;
  groupElement: boolean;
};

type SectionProps = {
  section: Section;
};

export const Section = ({ section }: SectionProps): ReactElement => {
  const [modifiedSection, setModifiedSection] = useState<Section>(section);
  const [groupedElements, setGroupedElements] = useState<Array<Array<Element>>>(
    []
  );
  // (!) Will be replaced with actual login State
  const isLoggedIn = process.env.NEXT_PUBLIC_FAKEROOT === 'true' ? true : false;

  useEffect(() => {
    const elements: Element[][] = [];
    let groupId = 0;
    const increment = () => {
      groupId = groupId + 1;
    };

    modifiedSection.render.forEach((element, index) => {
      // We want to add the orig index to the element,
      // to target a specific update
      const addIndex = (element: Element) => {
        return {
          ...element,
          index,
        };
      };

      if (element.overrideLayout || (!element.groupElement && index !== 0)) {
        increment();
      }

      if (!elements[groupId]) {
        elements[groupId] = [addIndex(element)];
      } else {
        elements[groupId].push(addIndex(element));
      }
    });
    setGroupedElements(elements);
  }, [modifiedSection]);

  // Should be moved to a "EditText" component
  const updateContent = (index: number, content: string): void => {
    // Get and update the edited element
    const updatedElement: Element = {
      ...modifiedSection.render[index],
      content,
    };
    // Replace it in render list
    const updatedRender = modifiedSection.render.map((element, elIndex) => {
      if (elIndex === index) {
        return updatedElement;
      }
      return element;
    });
    // Update renderlist in section
    const updated = {
      ...modifiedSection,
      render: updatedRender,
    };
    setModifiedSection(updated);
  };

  return (
    <>
      <NoSsr>
        <ReactTooltip backgroundColor={'black'} />
      </NoSsr>
      {isLoggedIn && (
        <EditSection
          modifiedSection={modifiedSection}
          setModifiedSection={setModifiedSection}
          currentColorScheme={modifiedSection.colorScheme}
        />
      )}
      <SectionWrapper
        colorScheme={modifiedSection.colorScheme}
        title={modifiedSection.title}
      >
        <div className="flexWrap">
          {groupedElements.map((elements, index) => {
            const flexItemClass =
              index % 2 == 0
                ? getLeftLayout(modifiedSection.layout)
                : getRightLayout(modifiedSection.layout);

            const overrideFlexItemClass =
              elements.length === 1 && elements[0].overrideLayout
                ? getOverrideLayout(elements[0].overrideLayout || '')
                : null;

            return (
              <div
                key={index}
                className={cN(
                  overrideFlexItemClass ? overrideFlexItemClass : flexItemClass
                )}
              >
                {elements.map(element => {
                  switch (element.collection) {
                    case 'sectionsText':
                      return (
                        <SectionsText
                          key={'text-' + element.index}
                          element={element}
                          modifiedSection={modifiedSection}
                          isLoggedIn={isLoggedIn}
                          updateContent={updateContent}
                          setModifiedSection={setModifiedSection}
                        />
                      );
                    case 'sectionsImage':
                      return (
                        <div key={'image-' + element.index}>
                          {isLoggedIn && (
                            <EditElement
                              modifiedSection={modifiedSection}
                              setModifiedSection={setModifiedSection}
                              element={element}
                            />
                          )}
                          <DirectusImage
                            className=""
                            assetId={element.image}
                            alt={element.title}
                            fill
                          />
                        </div>
                      );
                    case 'sectionsComponent':
                      const Component = dynamic(
                        () => import(`../_dynamic/${element.component}`),
                        { ssr: false, loading: () => null }
                      );
                      return (
                        <div key={'component-' + element.index}>
                          {isLoggedIn && (
                            <EditElement
                              modifiedSection={modifiedSection}
                              setModifiedSection={setModifiedSection}
                              element={element}
                            />
                          )}
                          <Component key={element.id} />
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            );
          })}
        </div>
      </SectionWrapper>
    </>
  );
};
