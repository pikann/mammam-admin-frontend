import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {
  Button,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Modal,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import * as VideoActions from './store/actions';
import { makeSelectLoading, makeSelectPosts, makeSelectTotalPage } from './store/selectors';
import { IPost } from './store/interfaces/post';

interface IProp {
  isLoading: boolean;
  posts: IPost[];
  totalPage: number;
  getPosts: (payload: any) => void;
  deletePost: (id: string) => void;
}

const VideoScreen = ({
  isLoading,
  posts,
  totalPage,
  getPosts,
  deletePost,
}: IProp) => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [showingVideo, setShowingVideo] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingVideo, setDeletingVideo] = useState('');

  useEffect(() => {
    const getPostTimeout = setTimeout(() => {
      getPosts({
        keyword,
        page,
      })
    }, 200);

    return () => {
      clearTimeout(getPostTimeout);
    }
  }, [getPosts, keyword, page])

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) => theme.palette.grey[100],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Box sx={{
        marginTop: '64px',
        padding: '20px',
      }}>
        <TextField
          margin="normal"
          required
          id="search"
          label="Search"
          name="search"
          autoComplete="search"
          autoFocus
          sx={{ backgroundColor: '#fff' }}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(0);
          }}
        />

        <TableContainer sx={{ marginTop: '20px' }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Thumbnail</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow
                  key={post._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    onClick={() => {
                      setShowingVideo(post.url);
                      setOpenVideoModal(true);
                    }}
                  >
                    {post._id}
                  </TableCell>
                  <TableCell onClick={() => {
                    setShowingVideo(post.url);
                    setOpenVideoModal(true);
                  }}>
                    <Box
                      component="img"
                      sx={{
                        height: 50,
                        width: 50,
                      }}
                      alt="thumbnail"
                      src={post.thumbnail}
                    />
                  </TableCell>
                  <TableCell onClick={() => {
                    setShowingVideo(post.url);
                    setOpenVideoModal(true);
                  }}>{post.description}</TableCell>
                  <TableCell>{post.author.username}</TableCell>
                  <TableCell>
                    <Button color="warning" variant="contained" onClick={() => {
                      setDeletingVideo(post._id);
                      setOpenDeleteDialog(true);
                    }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container marginTop={'40px'} justifyContent="center">
          <Pagination
            count={totalPage}
            color="primary"
            onChange={(e, value) => setPage(value - 1)}
          />
        </Grid>

        {isLoading ? <Grid container marginTop={'40px'} justifyContent="center">
          <CircularProgress color='secondary' size={25} />
        </Grid> : ''}
      </Box>

      <Modal
        open={openVideoModal}
        onClose={() => setOpenVideoModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
        }}>
          <CardMedia
            component='video'
            image={showingVideo}
            autoPlay
          />
        </Box>
      </Modal>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete post
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this video?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            deletePost(deletingVideo);
            setOpenDeleteDialog(false);
          }}>Yes</Button>
          <Button onClick={() => setOpenDeleteDialog(false)} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

const mapStateToProps = createStructuredSelector<any, any>({
  isLoading: makeSelectLoading(),
  posts: makeSelectPosts(),
  totalPage: makeSelectTotalPage(),
});

const mapDispatchToProps = (dispatch: any) => ({
  getPosts: (payload: any) => dispatch(VideoActions.getPosts.request(payload)),
  deletePost: (id: string) => dispatch(VideoActions.deletePost.request(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoScreen);
