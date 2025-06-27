import React, { useState } from 'react';
import './home.css';
import axios from 'axios';

const Home = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [mensagem, setMensagem] = useState('');

    // Lida com seleção de arquivos e preview
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setMensagem('');

        if (file) {
            if (file.type === 'application/pdf') {
                setPreviewUrl(URL.createObjectURL(file));
            } else {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewUrl(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    // Envia o arquivo para o backend
    const handleUpload = async () => {
        if (!selectedFile) return;

        

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:3001/documents/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMensagem(response.data.message); // <- Exibe mensagem do backend
        } catch (error) {
            console.error('Erro ao enviar o arquivo:', error.response?.data || error.message); // 👈 mostra detalhes);
            setMensagem('Erro ao validar o boleto.');
        }
    };

    return (
        <div className="container1">
            <h1 className='title1'>Validador de Boleto Nacional</h1>

            <div>
                <h1 className='title2'>Upload de Boleto</h1>

                <input
                    className='input'
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                />

                {selectedFile && (
                    <div>
                        <p className='selectedfile'>Arquivo selecionado: {selectedFile.name}</p>

                        {previewUrl && (
                            <div>
                                {selectedFile.type === 'application/pdf' ? (
                                    <iframe
                                        src={previewUrl}
                                        width="100%"
                                        height="500px"
                                        title="Pré-visualização do Boleto"
                                    />
                                ) : (
                                    <img
                                        src={previewUrl}
                                        alt="Pré-visualização do Boleto"
                                        style={{ maxWidth: '100%', maxHeight: '500px' }}
                                    />
                                )}
                            </div>
                        )}

                        <button className="upload-button" onClick={handleUpload}>
                            Validar Boleto
                        </button>
                    </div>
                )}

                {mensagem && (
                    <p className='resultado'>{mensagem}</p>
                )}
            </div>
        </div>
    );
};

export default Home;