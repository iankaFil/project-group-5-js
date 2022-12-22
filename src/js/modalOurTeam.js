import HystModal from 'hystmodal';
import 'hystmodal/dist/hystmodal.min.css';
// import { refs } from './refs';

// refs.openOurTeam.addEventListener('click', onClick);

const myModal = new HystModal({
  linkAttributeName: 'data-hystmodal',
  closeOnButton: true,
});

function onClick() {
  myModal.init();
}
