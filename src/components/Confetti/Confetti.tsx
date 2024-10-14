import { useEffect } from 'react';
import Confetti from 'react-confetti';

export type ConfettiComponentProps = {
  show: boolean;
  onHide: () => void;
};

const ConfettiComponent = ({ show, onHide }: ConfettiComponentProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onHide();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  return (
    show && (
      <Confetti
        width={window.innerWidth}
        height={1700}
        numberOfPieces={300}
        gravity={0.9}
        wind={0.04}
        colors={['#ff0000', '#00ff00', '$black0ff']}
        recycle={false}
        initialVelocityY={20}
        friction={0.95}
      />
    )
  );
};

export default ConfettiComponent;
