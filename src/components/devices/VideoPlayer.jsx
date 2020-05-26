import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CardMedia from '@material-ui/core/CardMedia';
import DialogActions from '@material-ui/core/DialogActions';
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";


/**
 * Creates a VideoPlayer to view the security camera's video feed
 * @param device
 * @returns {*} VideoPlayer
 */
const VideoPlayer = (device) => {
    const defaultVideo = 'https://res.cloudinary.com/erickgarro/video/upload/v1586203233/SmartHut/video-cabin.mp4';
    const [isLoading, setIsLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);
    const [videoSource, setVideoSource] = React.useState(defaultVideo);
    const ColorCircularProgress = withStyles({ root: { color: '#580B71' } })(CircularProgress);

    // Makes interval fetches for state updating
    useEffect(() => {
        if (device.open) {
          const fetchUrl = `${window.location.protocol}//${window.location.hostname}:8888/devices/video/${device.device.id}`;
          const method = 'GET';
          const headers = {
            user: localStorage.getItem('username'),
            'session-token': localStorage.getItem('session_token'),
          };

          fetch(fetchUrl, {
            method,
            headers,
          })
          .then((res) => {
            if (res.status === 200) {
              return res.text();
            }
            setIsError(true);
            return null;
          })
          .then((data) => {
            const fetchedVideo = JSON.parse(data);

            if (!fetchedVideo || fetchedVideo.length !== 0) {
              setVideoSource(fetchedVideo);
              setIsLoading(false);
            }
          })
          .catch((e) => {
            console.log(e);
            setIsLoading(false);
            setIsError(true);
          });
        }
      },
      [device.device.id, device.open]);


    return (
      <>
        <Dialog
          fullWidth
          maxWidth={'md'}
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
              <div className={(isLoading) ? 'centered-loading-data-message' : 'display-none'}>
                <ColorCircularProgress />
              </div>
              <CardMedia
                className={(isLoading) ? 'display-none' : undefined}
                component="video"
                image={videoSource}
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
      </>
    );
  }
;

export { VideoPlayer as default };
