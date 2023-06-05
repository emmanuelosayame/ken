import {
  BallTriangle,
  CirclesWithBar,
  Dna,
  FallingLines,
  MutatingDots,
  ProgressBar,
  RevolvingDot,
  RotatingLines,
} from "react-loader-spinner";
import { RemoveScroll } from "react-remove-scroll";

export const LoadingBlur = () => {
  return (
    <RemoveScroll className='absolute inset-0 h-full flex justify-center items-center z-50 bg-black/40'>
      <RotatingLines
        // height='120'
        strokeColor='grey'
        strokeWidth='5'
        animationDuration='0.75'
        width='80'
        // color='black'
        visible={true}
        // outerCircleColor=''
        // innerCircleColor=''
        // barColor=''
        // ariaLabel='circles-with-bar-loading'
      />
    </RemoveScroll>
  );
};
