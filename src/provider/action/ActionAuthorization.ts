import HttpClient from "../HttpClient";

export const postAuthAction = async <T>(
  url: string,
  body: any
): Promise<{ status: number; data?: T }> => {
  try {
    const response = await HttpClient.post({
      url: url,
      data: body,
    });

    return {
      status: response.status, // Suponiendo que `response` tiene una propiedad `status`
      data: response.data as T, // Cast `response.data` como tipo genérico `T`
    };
  } catch (error) {
    // Manejo de errores, puedes ajustar esto según tus necesidades
    return {
      status: error.response?.status || 500, // Retorna el status del error o 500 si no hay respuesta
      data: error.response?.data || null, // Retorna los datos del error o null
    };
  }
};

export const postEmptyAction = (url: string, body: any) => {
  return new Promise((resolve) => {
    HttpClient.postEmpty({
      url: url,
      data: body,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error.response);
        resolve(error.response);
      });
  });
};

export const putAuthAction = async <T>(
  url: string,
  body: any
): Promise<{ status: number; data?: T }> => {
  try {
    const response = await HttpClient.put({
      url: url,
      data: body,
    });

    return {
      status: response.status, // Suponiendo que `response` tiene una propiedad `status`
      data: response.data as T, // Cast `response.data` como tipo genérico `T`
    };
  } catch (error) {
    // Manejo de errores, puedes ajustar esto según tus necesidades
    return {
      status: error.response?.status || 500, // Retorna el status del error o 500 si no hay respuesta
      data: error.response?.data || null, // Retorna los datos del error o null
    };
  }
};

export const getAuthAction = async <T>(
  url: string
): Promise<{ status: number; data?: T }> => {
  try {
    const response = await HttpClient.get({ url });
    return { status: response.status, data: response.data as T };
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || {
      message: "An unknown error occurred",
    };
    console.error("Error fetching data:", error);

    return { status, data: data as T };
  }
};

export const deleteAction = (url: string) => {
  return new Promise((resolve) => {
    HttpClient.delete({
      url,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error.response);
        resolve(error.response);
      });
  });
};
