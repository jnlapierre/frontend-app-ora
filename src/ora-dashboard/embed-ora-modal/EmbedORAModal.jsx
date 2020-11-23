import { Button, Modal } from '@edx/paragon';
import { getConfig } from '@edx/frontend-platform';
import React, { useState } from 'react';

import PropTypes from 'prop-types';

const { LMS_BASE_URL } = getConfig();

function EmbedORAModal({ usageKey, title, buttonText }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="embed-ora-modal">
      <Modal
        open={open}
        dialogClassName="modal-lg"
        title={title}
        renderDefaultCloseButton={false}
        onClose={() => setOpen(false)}
        body={(
          <div className="embed-responsive embed-responsive-16by9">
            <iframe title={title} className="embed-responsive-item ora-iframe" src={`${LMS_BASE_URL}/xblock/${usageKey}`} />
          </div>
        )}
      />
      <Button variant="light" onClick={() => setOpen(true)}>{buttonText}</Button>
    </div>
  );
}

EmbedORAModal.propTypes = {
  usageKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default EmbedORAModal;
