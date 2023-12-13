import React, { useState } from 'react';
import {Grid, Stack, TextField, MenuItem, Typography, Chip, AppBar, Toolbar} from '@mui/material'
import '../App.css';

const ArticleList: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<string>('Apple');
  const [language, setLanguage] = useState<string>('en')
  const [theme, setTheme] = useState<string>('ltr')

  const handleChipClick = (topic: string) => {
    setActiveTopic(topic)
  };

  const handleLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value as string)
  }

  const handleTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.value)
    document.getElementsByTagName('html')[0].setAttribute("dir", event.target.value);
  }

  return (
    <div className="articleList">
      <AppBar position="static" sx={{ backgroundColor:'#ffffff94' }}>
        <Toolbar>
          <Grid container>
            <Grid item className="logo" xs={12} md={6} py={1}>
              <Typography variant="h6" sx={{ flexGrow:1, color:'#333' }}>
                DBZL-NewsApp
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}py={1} >
              <Stack direction="row" sx={{ overflowX: 'auto', float: {md:'right'} }}>
                {['Apple', 'Meta', 'Netflix', 'Google', 'Twitter', 'Tesla'].map((topic) => (
                  <Chip  sx={{ margin:'0 5px' }} key={topic} label={topic}  variant={topic === activeTopic ? 'filled' : 'filled'} color={topic === activeTopic ? 'success' : 'secondary'} onClick={() => handleChipClick(topic)} />
                ))}

              
                <TextField size="small"
                  id="language-selector"
                  value={language}
                  select
                  onChange={handleLanguage}
                  sx={{ margin:'0 5px', minWidth:"fit-content" }}
                >
                  <MenuItem value="en">EN</MenuItem>
                  <MenuItem value="ar">AR</MenuItem>
                </TextField>

                <TextField size="small"
                  id="theme-selector"
                  value={theme}
                  select
                  onChange={handleTheme}
                  sx={{ margin:"0 5px", minWidth:"fit-content" }}
                >
                  <MenuItem value="ltr">LTR</MenuItem>
                  <MenuItem value="rtl">RTL</MenuItem>
                </TextField>
              </Stack>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ArticleList;
