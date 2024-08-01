import {
  HeartIcon,
  MoonIcon,
  StarIcon,
  SunIcon,
} from "@heroicons/react/16/solid";
import { useThemeContext } from "../contexts/ThemeContext";

const ThemeSwitch = () => {
  const {
    primaryTheme,
    changePrimaryTheme,
    secondaryTheme,
    changeSecondaryTheme,
    changeAttributes,
  } = useThemeContext();

  return (
    <div className="flex flex-col items-center gap-10 mt-auto mb-5">
      <span className="flex items-center gap-3">
        <p className="w-20 text-end">light</p>
        <label className="toggle-button">
          <input
            checked={primaryTheme}
            onChange={() => {
              changePrimaryTheme(!primaryTheme);
              changeAttributes(primaryTheme, secondaryTheme);
            }}
            type="checkbox"
          />
          <span className="flex items-center p-0 slider primary-btn">
            {primaryTheme ? <MoonIcon /> : <SunIcon />}
          </span>
        </label>
        <p className="w-20">dark</p>
      </span>
      <span className="flex items-center gap-3">
        <p className="w-20 text-end">sweet</p>
        <label className="toggle-button">
          <input
            checked={secondaryTheme}
            onChange={() => {
              changeSecondaryTheme(!secondaryTheme);
              changeAttributes(primaryTheme, secondaryTheme);
            }}
            type="checkbox"
          />
          <span className="flex items-center p-0 slider primary-btn">
            {secondaryTheme ? <StarIcon /> : <HeartIcon />}
          </span>
        </label>
        <p className="w-20">minimal</p>
      </span>
    </div>
  );
};

export default ThemeSwitch;
