import Estate from "../models/estate.model.js";






export async function subirImagen(req, res) {
  try {
    const nuevoAnimal = new Estate(req.body);
    await nuevoAnimal.save();
    res.status(201).json({ message: 'Animal guardado exitosamente' });
  } catch (error) {
    console.error('Error al guardar el animal:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


export const ganado = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 15;

    const totalGanado = await Estate.countDocuments();
    const totalPages = Math.ceil(totalGanado / pageSize);

    const skip = (page - 1) * pageSize;

    const ganado = await Estate.find()
      .select('identificationNumber name breed gender birthDate')
      .skip(skip)
      .limit(pageSize);

    const resultado = {
      ganado: ganado,
      page: page,
      totalPages: totalPages,
      pageSize: pageSize,
      totalGanado: totalGanado
    };

    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el ganado desde la base de datos");
  }
};




export const buscarRegistroGanado = async (req, res) => {
  try {
    const { nombre, identificacion } = req.query;
    let estates;
    
    if (nombre) {
      estates = await Estate.find({ name: nombre });
    } else if (identificacion) {
      estates = await Estate.find({ identificationNumber: identificacion });
    } else {
      return res.status(400).json({ message: "Debe proporcionar un nombre o una identificación para buscar." });
    }

    if (estates.length > 0) {
      res.status(200).json({ resultado: estates });
    } else {
      res.status(404).json({ message: "No se encontraron registros." });
    }
  } catch (error) {
    console.error("Error al buscar el usuario:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};




export const updateEstateRegister = async (req, res) => {
  const { vacaId, terneroId } = req.params;
  console.log("ides de vaca y ternero: ", vacaId, terneroId)
  const updatedData = req.body;
  console.log("data para actualizar: ", updatedData)

  try {
    const vaca = await Estate.findById(vacaId);
    if (!vaca) {
  return res.status(404).json({ message: "Vaca no encontrada" });
}

if (!vaca.historialTerneros) {
  return res.status(400).json({ message: "La vaca no tiene historial de terneros" });
}

const terneroIndex = vaca.historialTerneros.findIndex(ternero => ternero.id === terneroId);
    if (terneroIndex === -1) {
      return res.status(404).json({ message: "Ternero no encontrado en el historial de la vaca" });
    }
    vaca.historialTerneros[terneroIndex] = { ...vaca.historialTerneros[terneroIndex], ...updatedData };
    await vaca.save();
    res.status(200).json({ message: "Registro actualizado correctamente" });
  } catch (error) {
    console.log("Error al actualizar el registro:", error);
    res.status(500).json({ message: "Error del servidor al actualizar el registro" });
  }
};



export const addCalfToCow = async (req, res) => {
  const { cowId } = req.params;
  const { identificationNumber, name, breed, gender, birthDate, color, distinctiveMark, description } = req.body;

  try {
    const allCows = await Estate.find({ identificationNumber });
    if (allCows.length > 0) {
      return res.status(400).json({ message: 'Ya existe una vaca con este número de identificación' });
    }

    const cow = await Estate.findById(cowId);
    if (!cow) {
      return res.status(404).json({ message: 'Vaca no encontrada' });
    }
    const hasDuplicateIdentificationInHistory = cow.historialTerneros.some(ternero => ternero.identificationNumber === identificationNumber);
    if (hasDuplicateIdentificationInHistory) {
      return res.status(400).json({ message: 'Ya existe un ternero con este número de identificación en el historial de esta vaca' });
    }

    cow.historialTerneros.push({
      identificationNumber,
      name,
      breed,
      gender,
      birthDate,
      color,
      distinctiveMark,
      description
    });

    await cow.save();
    
    return res.status(201).json({ message: 'Ternero añadido correctamente' });
  } catch (error) {
    console.error('Error al añadir ternero:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};





export const obtainBv = async (req, res) => {
  try {
    const id = req.params.id; 
    const data = await Estate.findById(id).select('identificationNumber name gender birthDate breed');
    if (!data) {
      return res.status(404).json({ message: 'No se encontró ninguna entidad con el ID proporcionado' });
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocurrió un error al obtener los datos' });
  }
};



export const obtainVbecerro = async (req, res) => {
  try {
    const id = req.params.id; 
    const data = await Estate.findById(id).select('historialTerneros');
    if (!data) {
      return res.status(404).json({ message: 'No se encontró ninguna entidad con el ID proporcionado' });
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocurrió un error al obtener los datos' });
  }
};

export const updateEstateRegisterCow = async (req, res) => {
  const { vacaId } = req.params;
  const updatedData = req.body;
  try {
    const vaca = await Estate.findById(vacaId);
    if (!vaca) {
      return res.status(404).json({ message: "Vaca no encontrada" });
    }
    vaca.set(updatedData);
    await vaca.save();
    res.status(200).json({ message: "Vaca actualizada correctamente" });
  } catch (error) {
    console.log("Error al actualizar la vaca:", error);
    res.status(500).json({ message: "Error del servidor al actualizar la vaca" });
  }
};




