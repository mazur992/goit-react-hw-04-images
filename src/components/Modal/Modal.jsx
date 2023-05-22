import PropTypes from 'prop-types';
import * as basicLightbox from 'basiclightbox';
import { useEffect } from 'react';

export default function Modal(props) {
  const { largeImg } = props;
  const instance = basicLightbox.create(
    ` <div class="overlay">
      <div class="modal">
      <img src=${largeImg.img} alt=${largeImg.tags} />
      </div>
    </div>`
  );

  useEffect(() => {
    const clickBackdrop = event => {
      if (event.currentTarget === event.target) {
        props.hideModal();
        instance.close(() => {
          document.removeEventListener('click', clickBackdrop);
        });
      }
    };
    const clickEsc = event => {
      if (event.code === 'Escape') {
        props.hideModal();
        instance.close(() => {
          document.removeEventListener('click', clickBackdrop);
        });
      }
    };
    instance.show(() => {
      const basicEl = document.querySelector('.basicLightbox');
      basicEl.addEventListener('click', clickBackdrop);
    });
    window.addEventListener('keydown', clickEsc);
    return () => {
      window.removeEventListener('keydown', clickEsc);
    };
  }, [props, instance]);

  return;
}
Modal.propTypes = {
  largeImg: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  isShowModal: PropTypes.bool.isRequired,
};
