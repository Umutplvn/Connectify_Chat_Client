import { Typography, Button, Box } from '@mui/material';

const Agreement = ({ onClose }) => {

  return (
    <Box sx={{height:"100vh"}}>
  <Box sx={{mt:"1rem", mb:"2rem"}}>
        <Typography sx={{textAlign:'center', fontSize:"1.2rem",color:"black", fontWeight:"700", mb:"1rem"}}>
         USER AGREEMENT
        </Typography>
        <Typography paragraph>
          By using the Connectify chat application, you agree to the following terms and conditions:
        </Typography>
        <Typography paragraph>
          <strong>Age Restriction:</strong> Connectify is intended for use by individuals aged 16 and older. If you are under the age of 16, you are not permitted to use this application.
        </Typography>
        <Typography paragraph>
          <strong>Limitation of Liability:</strong> The Connectify chat application is provided "as is" without any warranties, express or implied. In no event shall the developers of Connectify be liable for any damages arising from the use of this application.
        </Typography>
        <Typography paragraph>
          <strong>Data Storage:</strong> By using Connectify, you consent to the storage and processing of your data on our servers. Your data will be used solely for the purpose of providing chat services and will not be shared with third parties without your consent. 
        </Typography>
        <Box sx={{display:"flex", justifyContent:"center"}}>
        <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              pl: 4,
              pr: 4,
              backgroundColor: "#F2F2F2",
              color: "#242424",
              borderRadius: "1rem",
              width: "8rem",
              transition: "0.4s",
              "&:hover": {
                backgroundColor: "#537c87",
                color: "white",
              },
            }}
            onClick={onClose}
          >
            close
          </Button>

        </Box>
     
      </Box>
    </Box>
    
  );
}

export default Agreement;
