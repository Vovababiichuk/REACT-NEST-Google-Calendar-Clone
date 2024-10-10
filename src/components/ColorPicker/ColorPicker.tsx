import { useEffect, useRef, useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';

interface ColorPickerProps {
  color: string;
  onChange: (color: ColorResult) => void;
}

const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const handleShowColorPicker = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowColorPicker(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target as Node)) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker]);

  return (
    <div className="event-form__color">
      <span
        className="event-form__color-base"
        style={{ backgroundColor: color }}
        onClick={handleShowColorPicker}
      />
      {showColorPicker && (
        <div className="event-form__color-picker" ref={colorPickerRef}>
          <SketchPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
