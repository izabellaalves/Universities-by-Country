import React, { useEffect, useState } from 'react';
import { Typography, Autocomplete, TextField, List, ListItem, ListItemText, Pagination, FormControl, CircularProgress, Card, CardContent, Divider, Box } from '@mui/material';
import { listarPaises } from '../../services/countries';
import { listarUniversidadesPorPais } from '../../services/universities';

export default function Home() {
    const [paises, setPaises] = useState([]);
    const [paisSelecionado, setPaisSelecionado] = useState('');
    const [universidades, setUniversidades] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(10);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        listarPaises()
            .then(data => {
                setPaises(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar países:', error);
                setLoading(false);
            });
    }, []);

    function handlePaisSelecionado(event, value) {
        setPaisSelecionado(value);
        setLoading(true);
        listarUniversidadesPorPais(value)
            .then(data => {
                setUniversidades(data);
                setPagina(1);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar universidades:', error);
                setLoading(false);
            });
    }

    function handleChangePagina(event, value) {
        setPagina(value);
    }

    function handleItensPorPaginaChange(event) {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setItensPorPagina(value);
            setPagina(1);
        }
    }

    const inicioIndex = (pagina - 1) * itensPorPagina;
    const fimIndex = inicioIndex + itensPorPagina;
    const universidadesPaginadas = universidades.slice(inicioIndex, fimIndex);

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <Typography
                variant="h4"
                component="h6"
                gutterBottom
                align="center"
            >
                Universidades por País
            </Typography>

            <Autocomplete
                disablePortal
                id="combo-box-paises"
                options={paises}
                sx={{ width: '100%', maxWidth: 400, marginTop: 3, marginBottom: 2, marginX: 'auto' }}
                onChange={handlePaisSelecionado}
                renderInput={(params) => <TextField {...params} label="Selecione um país" variant="outlined" />}
            />

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                    <CircularProgress />
                </div>
            ) : universidades.length > 0 ? (
                <>
                    <List sx={{ marginBottom: 2 }}>
                        {universidadesPaginadas.map((universidade, index) => (
                            <ListItem key={index} sx={{ marginBottom: 2, padding: 2, borderRadius: '8px', boxShadow: 1, transition: '0.3s', '&:hover': { boxShadow: 3 } }}>
                                <Card sx={{ width: '100%' }}>
                                    <CardContent>
                                        <ListItemText
                                            primary={universidade.name}
                                            secondary={
                                                <a href={universidade.web_pages[0]} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>
                                                    {universidade.web_pages[0]}
                                                </a>
                                            }
                                        />
                                    </CardContent>
                                </Card>
                            </ListItem>
                        ))}
                    </List>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, marginBottom: 2 }}>
                        <FormControl sx={{ maxWidth: 100 }}>
                            <TextField
                                id="itens-por-pagina"
                                label="Exibir"
                                type="number"
                                value={itensPorPagina}
                                onChange={handleItensPorPaginaChange}
                                InputProps={{ inputProps: { min: 1 } }}
                                variant="outlined"
                            />
                        </FormControl>

                        <Pagination
                            count={Math.ceil(universidades.length / itensPorPagina)}
                            page={pagina}
                            onChange={handleChangePagina}
                            color="primary"
                            sx={{ display: 'flex', justifyContent: 'center' }}
                        />
                    </Box>
                </>
            ) : (
                paisSelecionado && (
                    <Typography variant="h6" component="h2" align="center" sx={{ color: 'grey', marginTop: 3 }}>
                        Nenhuma universidade encontrada para o país selecionado.
                    </Typography>
                )
            )}
        </div>
    );
}
