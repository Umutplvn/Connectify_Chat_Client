import { Typography, Container, Paper, Button, Box } from '@mui/material';

const Agreement = ({ onClose }) => {

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h4" gutterBottom>
          User Agreement
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
            variant="contained"
             sx={{ mt: 3, mb: 2, pl:4, pr:4, color:"white", backgroundColor:"#41D463", "&:hover": { backgroundColor: "#2daa4a"} }} onClick={onClose}>Close</Button>

        </Box>
     
      </Paper>
    </Container>
  );
}

export default Agreement;
