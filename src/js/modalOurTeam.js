import HystModal from 'hystmodal';
import 'hystmodal/dist/hystmodal.min.css';
import { refs } from './refs';

refs.openOurTeam.addEventListener('click', onClick);

const myModal = new HystModal({
    linkAttributeName: 'data-hystmodal',
});

function onClick() {
    myModal.init();
}
