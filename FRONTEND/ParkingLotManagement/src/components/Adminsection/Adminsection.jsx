import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const columns = [
  { id: 'spot_number', label: 'Spot Number', minWidth: 170 },
  { id: 'floor', label: 'Floor', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 170, align: 'right' },
  { id: 'username', label: 'Username', minWidth: 170, align: 'right' },
];

function createData(spot_number, floor, status, username) {
  return { spot_number, floor, status, username: username || 'N/A' };
}

export default function Adminsection() {
  const [parkingData, setParkingData] = React.useState([]);
  const [spotNumber, setSpotNumber] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/v1/parkingSpotbystatus", { withCredentials: true });
        const data = response.data.map(spot => createData(spot.Spot_number, spot.floor, spot.status, spot.username));
        setParkingData(data);
      } catch (error) {
        console.error('Error fetching parking spots:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.patch(
        "http://localhost:7000/api/v1/ParkingSpots",
        { spot_number: spotNumber },
        { withCredentials: true }
      );
      await axios.delete("http://localhost:7000/api/v1/Reservation", {
        data: { spot_no: spotNumber },
        withCredentials: true
      });
      toast.success("Parking spot data cleared");
      setSpotNumber('');

      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:7000/api/v1/parkingSpotbystatus", { withCredentials: true });
          const data = response.data.map(spot => createData(spot.Spot_number, spot.floor, spot.status, spot.username));
          setParkingData(data);
        } catch (error) {
          toast.error("Error while fetching the data");
          console.error('Error fetching parking spots:', error.message);
        }
      };
      fetchData();
    } catch (error) {
      toast.error("Error updating parking spot");
      console.error('Error updating parking spot:', error.message);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <section className="p-6 bg-gray-800 min-h-screen flex flex-col items-center">
      <Paper sx={{ width: '90%', maxWidth: 1200, overflow: 'hidden' }} className="bg-gray-800 text-white shadow-lg">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, backgroundColor: '#444', color: '#fff' }} // Dark background for header
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {parkingData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.spot_number}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{ backgroundColor: '#555', color: '#fff' }}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[4, 8, 12]}
          component="div"
          count={parkingData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div className="flex flex-col items-center w-full max-w-md mt-6">
        <input
          type="text"
          value={spotNumber}
          onChange={(e) => setSpotNumber(e.target.value)}
          placeholder="Enter Spot Number"
          className="mb-4 w-full px-4 py-2 text-white border border-gray-300 rounded-md bg-gray-700"
        />
        <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Update Spot</button>
      </div>
      <ToastContainer />
    </section>
  );
}
