import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
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

import * as RestaurantActions from './store/actions';
import { makeSelectLoading, makeSelectRestaurants, makeSelectTotalPage } from './store/selectors';
import { IRestaurant } from './store/interfaces/restaurant';

interface IProp {
  isLoading: boolean;
  restaurants: IRestaurant[];
  totalPage: number;
  getRestaurants: (payload: any) => void;
  deleteRestaurant: (id: string) => void;
}

const RestaurantScreen = ({
  isLoading,
  restaurants,
  totalPage,
  getRestaurants,
  deleteRestaurant,
}: IProp) => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingRestaurant, setDeletingRestaurant] = useState('');

  useEffect(() => {
    const getPostTimeout = setTimeout(() => {
      getRestaurants({
        keyword,
        page,
      })
    }, 200);

    return () => {
      clearTimeout(getPostTimeout);
    }
  }, [getRestaurants, keyword, page])

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
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurants.map((restaurant) => (
                <TableRow
                  key={restaurant._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    {restaurant._id}
                  </TableCell>
                  <TableCell>
                    <Box
                      component="img"
                      sx={{
                        height: 50,
                        width: 50,
                      }}
                      alt="avatar"
                      src={restaurant.avatar}
                    />
                  </TableCell>
                  <TableCell>{restaurant.name}</TableCell>
                  <TableCell>{restaurant.address}</TableCell>
                  <TableCell>
                    <Button color="warning" variant="contained" onClick={() => {
                      setDeletingRestaurant(restaurant._id);
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

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete restaurant
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this restaurant?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            deleteRestaurant(deletingRestaurant);
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
  restaurants: makeSelectRestaurants(),
  totalPage: makeSelectTotalPage(),
});

const mapDispatchToProps = (dispatch: any) => ({
  getRestaurants: (payload: any) => dispatch(RestaurantActions.getRestaurants.request(payload)),
  deleteRestaurant: (id: string) => dispatch(RestaurantActions.deleteRestaurant.request(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantScreen);
