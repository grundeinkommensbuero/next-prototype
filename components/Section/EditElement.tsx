import { ReactElement } from 'react';
import s from './style.module.scss';
import { Icon } from '@mdi/react';
import ReactTooltip from 'react-tooltip';
import {
  mdiPageLayoutHeader,
  mdiPageLayoutHeaderFooter,
  mdiDockLeft,
  mdiTablet,
  mdiBackspaceOutline,
  mdiPlaylistEdit,
} from '@mdi/js';
import { OverrideLayout, Section, Element } from '.';
import { NoSsr } from '../Utils/NoSsr';

type EditElementProps = {
  modifiedSection: Section;
  setModifiedSection: (section: Section) => void;
  index: number;
  element: Element;
};

export const EditElement = ({
  modifiedSection,
  setModifiedSection,
  index,
  element,
}: EditElementProps): ReactElement => {
  const updateElementLayout = (
    overrideLayout: OverrideLayout,
    index: number
  ): void => {
    // Get and update the edited element
    const updatedElement: Element = {
      ...modifiedSection.render[index],
      overrideLayout,
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

  const editElement = (edit: boolean, index: number): void => {
    // Get and update the edited element
    const updatedElement: Element = {
      ...modifiedSection.render[index],
      edit,
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
    <div className={s.editElement}>
      <NoSsr>
        <ReactTooltip backgroundColor="black" />
      </NoSsr>
      <button
        className="noStyleButton"
        onClick={() => updateElementLayout('25', index)}
      >
        <NoSsr>
          <Icon
            path={mdiDockLeft}
            title="Element Layout 25"
            size={1.25}
            horizontal
            vertical
            rotate={180}
            color="gray"
            data-tip="Element Layout 25%"
          />
        </NoSsr>
      </button>
      <button
        className="noStyleButton"
        onClick={() => updateElementLayout('50', index)}
      >
        <NoSsr>
          <Icon
            path={mdiPageLayoutHeaderFooter}
            title="Element Layout 50"
            size={1.25}
            horizontal
            vertical
            rotate={90}
            color="gray"
            data-tip="Element Layout 50%"
          />
        </NoSsr>
      </button>
      <button
        className="noStyleButton"
        onClick={() => updateElementLayout('75', index)}
      >
        <NoSsr>
          <Icon
            path={mdiPageLayoutHeader}
            title="Element Layout 75"
            size={1.25}
            horizontal
            vertical
            rotate={-90}
            color="gray"
            data-tip="Element Layout 75%"
          />
        </NoSsr>
      </button>
      <button
        className="noStyleButton"
        onClick={() => updateElementLayout('100', index)}
      >
        <NoSsr>
          <Icon
            path={mdiTablet}
            title="Element Layout 100"
            size={1.25}
            horizontal
            vertical
            rotate={0}
            color="gray"
            data-tip="Element Layout 100%"
          />
        </NoSsr>
      </button>
      <button
        className="noStyleButton"
        onClick={() => updateElementLayout(null, index)}
      >
        <NoSsr>
          <Icon
            path={mdiBackspaceOutline}
            title="Element Layout entfernen"
            size={1.25}
            horizontal
            vertical
            rotate={180}
            color="gray"
            data-tip="Element Layout entfernen"
          />
        </NoSsr>
      </button>
      {element.content && (
        <button
          className="noStyleButton"
          onClick={() => editElement(element.edit ? false : true, index)}
        >
          <NoSsr>
            <Icon
              path={mdiPlaylistEdit}
              title="Text bearbeiten"
              size={1.25}
              horizontal
              vertical
              rotate={180}
              color="gray"
              data-tip="Text bearbeiten"
            />
          </NoSsr>
        </button>
      )}
    </div>
  );
};
