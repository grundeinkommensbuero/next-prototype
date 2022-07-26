import cN from 'classnames';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { Dropdown, Menu, MenuEntry } from '../../utils/getMenus';
import { MainMenu } from './MainMenu/Desktop';
import { MainMenuMobile } from './MainMenu/Mobile';
import { HamburgerMenu } from './MainMenu/Mobile/HamburgerMenu';
import s from './style.module.scss';
import PageLogo from '../logo-expedition.svg';
import { useRouter } from 'next/router';
import AuthContext, {
  MunicipalityOfUser,
} from '../../context/Authentication/index';
import { stateToAgs } from '../../utils/stateToAgs';

const IS_BERLIN_PROJECT = process.env.NEXT_PUBLIC_PROJECT === 'Berlin';

type HeaderProps = {
  mainMenu: Menu;
  currentRoute: string;
};

export const Header = ({
  mainMenu,
  currentRoute,
}: HeaderProps): ReactElement => {
  const { customUserData, isAuthenticated } = useContext(AuthContext);

  const [mobileMenuActive, setMobileMenuActive] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [modifiedMainMenu, setModifiedMainMenu] = useState<Menu>(mainMenu);

  const { width } = useWindowDimensions();
  const router = useRouter();

  useEffect(() => {
    setIsMobile(width < 900);
  }, [width]);

  // Updates the Menu when userData is loaded
  useEffect(() => {
    const updateMenu = [...modifiedMainMenu];
    const municipalityMenuItems = createMunicipalityMenuItems();

    const indexDropdown = updateMenu.findIndex(el => el.label === 'Mitmachen');
    const indexEntry = (
      updateMenu[indexDropdown] as Dropdown
    ).entries.findIndex(e => e.label === 'Mein Ort');

    if (
      indexDropdown !== -1 &&
      indexEntry !== -1 &&
      municipalityMenuItems.length > 0
    ) {
      const a = (updateMenu[indexDropdown] as Dropdown).entries.slice(
        0,
        indexEntry
      );
      const b = (updateMenu[indexDropdown] as Dropdown).entries.slice(
        indexEntry + 1
      );
      (updateMenu[indexDropdown] as Dropdown).entries = [
        ...a,
        ...municipalityMenuItems,
        ...b,
      ];
    }
    setModifiedMainMenu(updateMenu);
  }, [customUserData, isAuthenticated]);

  // Helpers
  const createMunicipalityMenuItems = (maxEntries = 5): MenuEntry[] => {
    let sortedMunicipalities = [];
    const menuItems: MenuEntry[] = [];
    // After logout the customuserData gets populated again,
    // so we check for isAuthenticated here too
    if (!IS_BERLIN_PROJECT) {
      if (customUserData.municipalities && isAuthenticated) {
        sortedMunicipalities = [...customUserData.municipalities].sort(
          (a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          }
        );
        sortedMunicipalities
          .slice(0, maxEntries)
          .forEach((item: MunicipalityOfUser) => {
            menuItems.push({
              id: Math.random().toString(),
              status: 'published',
              sort: 0,
              label: `Mein Ort: ${item.name}`,
              // Because netlify redirect does not work at this stage, we pass the volksentscheid page
              // as external link if "Mein Ort" is berlin
              slug: `orte/${item.slug}`,
              useAction: item.ags === stateToAgs.berlin,
              action: 'redirectToBerlinPage',
            });
          });
      }
    }
    return menuItems;
  };

  return (
    <>
      <div className={s.header}>
        <div className={s.headerContent}>
          <PageLogo
            className="cursor-pointer h-12"
            color="black"
            alt={'Expedition Grundeinkommen Home'}
            onClick={() => router.push('/')}
          />
          {!isMobile ? (
            <MainMenu mainMenu={modifiedMainMenu} currentRoute={currentRoute} />
          ) : (
            <HamburgerMenu
              isActive={mobileMenuActive}
              setIsActive={setMobileMenuActive}
            />
          )}
        </div>
      </div>
      {isMobile && mobileMenuActive && (
        <div className={cN(s.mobileMenu)}>
          <MainMenuMobile
            mainMenu={modifiedMainMenu}
            currentRoute={currentRoute}
            closeMenu={() => setMobileMenuActive(false)}
          />
        </div>
      )}
    </>
  );
};
