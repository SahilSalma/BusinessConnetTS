
import React from 'react';
import LottieView from 'lottie-react';
import { AnimationProps } from '../Types/allTypes';

const Animation: React.FC<AnimationProps> = ({
    animationData,
    size: { width, height }
}) => {
	return (
		<LottieView
            style={{ width, height }}
			animationData={require(`../Assets/animations/${animationData}.json`)}
			loop={true}
			autoplay={true}
		/>
	);
};

export default Animation;