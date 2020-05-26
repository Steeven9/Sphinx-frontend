import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CardMedia from '@material-ui/core/CardMedia';
import DialogActions from '@material-ui/core/DialogActions';


/**
 * Creates a VideoPlayer to view the security camera's video feed
 * @param device
 * @returns {*} VideoPlayer
 */
const VideoPlayer = (device) => {
  let { video } = device.device;
  if (video === null
      || video === undefined
      || video === ''
      || video.length === 0) {
    video = 'https://res.cloudinary.com/erickgarro/video/upload/v1586203233/SmartHut/video-cabin.mp4';
  }
  return (
    <div>
      <Dialog
        open={device.open}
        onClose={device.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <h2 className="center-text">
          {device.device.roomName}
          :
          {' '}
          {device.device.name}
        </h2>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <CardMedia
              component="video"
              image={video}
              autoPlay
              loop
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            name="button"
            className="display-inf btn-secondary btn waves-effect waves-light"
            onClick={device.handleClose}
          >
            Close
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { VideoPlayer as default };
