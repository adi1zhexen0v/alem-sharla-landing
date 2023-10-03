import lottieWeb from 'lottie-web';

const lottie = ({ containerSelector, pathToFile }) => {
	lottieWeb.loadAnimation({
		container: document.querySelector(containerSelector),
		renderer: 'svg',
		loop: true,
		autoplay: true,
		path: pathToFile
	});
};

export default lottie;
