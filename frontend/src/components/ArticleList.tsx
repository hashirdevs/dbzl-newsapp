import React, { useEffect, useState } from 'react';
import {Grid, Stack, TextField, MenuItem, Card, CardContent, CardMedia, Typography, Chip, Link, Skeleton, AppBar, Toolbar} from '@mui/material'
import '../App.css';

interface CardData {
  title: string;
  urlToImage: string | null;
  url: string;
}

const ArticleList: React.FC = () => {
  const [data, setData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTopic, setActiveTopic] = useState<string>('Apple');
  const [language, setLanguage] = useState<string>('en')
  const [theme, setTheme] = useState<string>('ltr')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/api/${activeTopic.toLowerCase()}/${language}/`);
        const result = await response.json();
        if (Array.isArray(result)) {
            setData(result);
        } else {
            alert('Invalid data format:');
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTopic, language, theme]);

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

      {loading ? (
        <>
          <Grid container>
            <Grid item xs={12} sm={6} lg={3} px={2} py={2}>
              <Skeleton variant="rounded" height="250px" animation="wave"/>
              <Skeleton variant="text" width="90%" animation="wave" />
              <Skeleton variant="text" width="80%" animation="wave" />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} px={2} py={2}>
              <Skeleton variant="rounded" height="250px" animation="wave"/>
              <Skeleton variant="text" width="90%" animation="wave" />
              <Skeleton variant="text" width="80%" animation="wave" />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} px={2} py={2}>
              <Skeleton variant="rounded" height="250px" animation="wave"/>
              <Skeleton variant="text" width="90%" animation="wave" />
              <Skeleton variant="text" width="80%" animation="wave" />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} px={2} py={2}>
              <Skeleton variant="rounded" height="250px" animation="wave"/>
              <Skeleton variant="text" width="90%" animation="wave" />
              <Skeleton variant="text" width="80%" animation="wave" />
            </Grid>
          </Grid>
        </>
       
        
        
      ) : (

        <Grid container>
          {
            data && data.length > 0 ? (
              data.map((card, index) => (
                <Grid item xs={12} sm={6} lg={3} px={2} py={2}>
                  <Link key={index} href={card.url} target="_blank" underline='none'>
                    <Card key={index}>
                      {
                        card.urlToImage ? (
                          <CardMedia
                            component="img"
                            height="250px"
                            image={card.urlToImage}
                            loading="lazy"
                          />
                        ) : (
                          <CardMedia
                            component="img"
                            height="250px"
                            image="https://placehold.co/600x250"
                            loading="lazy"
                          />
                        )
                      }
                      
                      <CardContent>
                        <Typography key={index} variant="h6">{card.title.slice(0, 50)}...</Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))
            ) : (
              <Grid item xs={12} py={2} sx={{ textAlign:'center' }}>
                {
                  language === 'ar' ? (
                    <Typography variant="h6">لم يتم العثور على أخبار</Typography>
                  ) : (
                    <Typography variant="h6">No news found</Typography>
                  )
                }
              </Grid>
            ) 
          }
        </Grid>

      )}
    </div>
  );
};

export default ArticleList;
