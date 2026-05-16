import { useEffect, useRef, useState } from 'react';
import {
  BookOpenIcon,
  ChevronDownIcon,
  GridIcon,
  PrismLearningLogo,
} from '../icons/DemoIcons';
import coursesMenuData from '../../data/coursesMenuData';

export default function DemoAppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="demo-app-header">
      <div className="demo-app-header__inner">
        <div className="demo-app-header__left">
          <div className="demo-app-header__brand" aria-label="Prism Learning">
            <PrismLearningLogo width={118} className="demo-app-header__brand-mark" />
          </div>

          <div className="demo-app-header__platform-switcher" aria-label="Platform switcher">
            <button type="button" className="demo-app-header__platform-tab demo-app-header__platform-tab--active">
              Learn
            </button>
            <button type="button" className="demo-app-header__platform-tab">
              Neuron
            </button>
          </div>
        </div>

        <div className="demo-app-header__right">
          <button className="demo-app-header__nav-btn" type="button">
            <GridIcon size={18} />
            <span>Dashboard</span>
          </button>

          <div ref={menuRef} className="demo-app-header__menu-wrap">
            <button
              className={`demo-app-header__nav-btn ${menuOpen ? 'active' : ''}`}
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <BookOpenIcon size={18} />
              <span>Courses</span>
              <ChevronDownIcon size={16} className={`demo-app-header__chevron ${menuOpen ? 'open' : ''}`} />
            </button>

            {menuOpen ? (
              <div className="demo-app-header__menu">
                <div className="demo-app-header__menu-head">
                  <div>
                    <h3>All Courses</h3>
                    <p>Mocked course switcher from the live product</p>
                  </div>
                </div>

                {coursesMenuData.categories.map((category) => (
                  <div key={category.id} className="demo-app-header__menu-section">
                    <div className="demo-app-header__menu-label">{category.name}</div>
                    {category.courses.map((course) => (
                      <button
                        key={course.pageCode}
                        type="button"
                        className={`demo-app-header__course-item ${course.isCurrent ? 'current' : ''}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <div className="demo-app-header__course-copy">
                          <span className="demo-app-header__course-name">{course.name}</span>
                          <span className="demo-app-header__course-progress">{course.progress}% complete</span>
                        </div>
                        {course.isCurrent ? <span className="demo-app-header__course-chip">Current</span> : null}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <button className="demo-app-header__user-menu" type="button" aria-label="Profile menu">
            <span className="demo-app-header__avatar">LS</span>
            <ChevronDownIcon size={16} className="demo-app-header__user-chevron" />
          </button>
        </div>
      </div>
    </header>
  );
}
