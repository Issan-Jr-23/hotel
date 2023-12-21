import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GenderDetectionComponent = ({ userText }) => {
  const [gender, setGender] = useState('');

  const identifyGender = async () => {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        prompt: `Detectar el género basado en el siguiente texto: "${userText}"`,
        max_tokens: 10,
      }, {
        headers: {
          'Authorization': `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`
        }
      });

      const genderResponse = response.data.choices[0].text.trim();
      setGender(genderResponse); // "Masculino" o "Femenino"
    } catch (error) {
      console.error('Error al detectar el género:', error);
    }
  };

  useEffect(() => {
    if (userText) {
      identifyGender();
    }
  }, [userText]);

  return (
    <div>
      {gender && (
        <img src={gender === 'Masculino' ? 'path_to_male_image.jpg' : 'path_to_female_image.jpg'} alt="Imagen de género" />
      )}
    </div>
  );
};

export default GenderDetectionComponent;
