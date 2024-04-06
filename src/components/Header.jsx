import { Box, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

const Header = () => {
  return (

    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:1, boxShadow:"rgba(17, 17, 26, 0.1) 0px 1px 0px ", backgroundColor:"#fdffff",  mt:-1, pt:"1.5rem", pb:"0.6rem"}}>
    <Typography sx={{textAlign:"center", fontSize:"1.5rem", color:"#034159", fontWeight:"700"}}>CONNECTIFY</Typography>
    <SendIcon sx={{color:"#034159"}}/>
    </Box>
    
  )
}

export default Header