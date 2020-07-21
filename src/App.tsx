import './App.css';

import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
  useMemo,
  CSSProperties,
} from 'react';
import classNames from 'classnames';

const App: FC = memo(() => {
  useEffect(() => {
    playMusic();
  }, []);

  const optionsByType: {[t: number]: Option[]} = {
    1: useMemo(
      () => [
        {text: 'BUY', subtext: 'MELEE WEAPON'},
        {text: 'BUY', subtext: 'RANGED WEAPON'},
        {text: 'BUY', subtext: 'PROTECTOR'},
        {text: 'BUY', subtext: 'ACCESSORY'},
      ],
      []
    ),
    2: useMemo(
      () => [
        {text: 'Joker'},
        {text: 'Ryuji'},
        {text: 'Morgana'},
        {text: 'Ann'},
      ],
      []
    ),
    3: useMemo(
      () => [
        {text: 'Machete'},
        {text: 'Parrying Dagger'},
        {text: 'Dirk'},
        {text: 'Pro Skinning Knife'},
        {text: 'Quality Kopis'},
        {text: 'Killing Scalpel'},
        {text: 'Kopis'},
        {text: 'Skinning Knife'},
      ],
      []
    ),
  };

  const getOptionStylesByType: {[t: number]: GetOptionStyles} = {
    1: useCallback(
      (i: number) => [
        {top: 0, left: 30, transform: 'rotate(5deg)'},
        {top: 150, left: 0, transform: 'rotate(0deg)'},
        {top: 300, left: 100, transform: 'rotate(-10deg)'},
        {top: 450, left: 200, transform: 'rotate(-5deg)'},
      ],
      []
    ),
    2: useCallback(
      (i: number) => [
        {top: 0, right: 0, transform: 'rotate(0deg)'},
        {top: 150, right: 100, transform: 'rotate(15deg)'},
        {top: 300, right: 200, transform: 'rotate(30deg)'},
        {top: 450, right: 300, transform: 'rotate(45deg)'},
      ],
      []
    ),
    3: useCallback(
      (i: number) => [
        {top: 0},
        {top: 60},
        {top: 120},
        {top: 180},
        {top: 240},
        {top: 300},
        {top: 360},
        {top: 420},
      ],
      []
    ),
  };

  const [activeMenu, setActiveMenu] = useState(1);

  const goNext = useCallback(
    () => setActiveMenu((prev) => Math.min(prev + 1, 3)),
    []
  );
  const goPrev = useCallback(
    () => setActiveMenu((prev) => Math.max(prev - 1, 1)),
    []
  );

  return (
    <div className="screen">
      {([1, 2, 3] as MenuType[]).map((t) => (
        <Menu
          key={t}
          type={t}
          active={activeMenu === t}
          options={optionsByType[t]}
          getOptionStyles={getOptionStylesByType[t]}
          goNext={goNext}
          goPrev={goPrev}
        />
      ))}
    </div>
  );
});

export default App;

type MenuType = 1 | 2 | 3;

interface Option {
  text: string;
  subtext?: string;
}

interface GetOptionStyles {
  (selectedIndex: number): CSSProperties[];
}

interface MenuProps {
  type: MenuType;
  options: Option[];
  active: boolean;
  getOptionStyles: GetOptionStyles;
  goNext(): void;
  goPrev(): void;
}

const Menu: FC<MenuProps> = memo(
  ({type, options, active, getOptionStyles, goNext, goPrev}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectFns = useMemo(
      () => options.map((o, i) => (): void => setSelectedIndex(i)),
      [options]
    );
    const styles = useMemo(() => getOptionStyles(selectedIndex), [
      getOptionStyles,
      selectedIndex,
    ]);
    return (
      <div className={classNames('menu', `menu-${type}`, {active})}>
        {options.map((o, i) => {
          return (
            <div
              key={i}
              className={classNames('option', {active: i === selectedIndex})}
              style={styles[i]}
              onMouseEnter={selectFns[i]}
              onClick={goNext}>
              <div className="option-text">{o.text}</div>
              <div className="option-subtext">{o.subtext}</div>
            </div>
          );
        })}
      </div>
    );
  }
);

function playMusic(): void {
  // const audio = new Audio('layer-cake.mp3');
  // audio.play();
}
