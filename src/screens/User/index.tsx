import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { CircularProgress, Grid, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import * as UserActions from './store/actions';
import { makeSelectLoading, makeSelectTotalPage, makeSelectUsers } from './store/selectors';
import { IUser } from './store/interfaces/user';

interface IProp {
  isLoading: boolean;
  users: IUser[];
  totalPage: number;
  getUsers: (payload: any) => void;
}

const UserScreen = ({
  isLoading,
  users,
  totalPage,
  getUsers,
}: IProp) => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getPostTimeout = setTimeout(() => {
      getUsers({
        keyword,
        page,
      })
    }, 200);

    return () => {
      clearTimeout(getPostTimeout);
    }
  }, [getUsers, keyword, page])

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
                <TableCell>Username</TableCell>
                <TableCell>Bio</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user._id}
                  </TableCell>
                  <TableCell>
                    <Box
                      component="img"
                      sx={{
                        height: 50,
                        width: 50,
                      }}
                      alt="avatar"
                      src={user.avatar}
                    />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.bio}</TableCell>
                  <TableCell>{''}</TableCell>
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
    </Box>
  );
}

const mapStateToProps = createStructuredSelector<any, any>({
  isLoading: makeSelectLoading(),
  users: makeSelectUsers(),
  totalPage: makeSelectTotalPage(),
});

const mapDispatchToProps = (dispatch: any) => ({
  getUsers: (payload: any) => dispatch(UserActions.getUsers.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);