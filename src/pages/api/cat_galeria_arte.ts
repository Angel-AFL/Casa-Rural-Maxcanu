import type { CatGaleriaArte } from "../../types/global";

const apikey = import.meta.env.SUPABASE_KEY;
const authorization = `Bearer ${import.meta.env.SUPABASE_KEY}`;

export async function getCatGaleriaArte(): Promise<
  CatGaleriaArte[] | undefined
> {
  try {
    const response = await fetch(
      "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*",
      {
        headers: {
          apikey: apikey,
          authorization: authorization,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error de Supabase: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as CatGaleriaArte[];
    console.log("Datos de galerias de arte obtenidos:", data);
    return data;
  } catch (error) {
    console.error("Error fetching galerias de arte:", error);
  }
}

export async function getAvesTropicales(): Promise<
  CatGaleriaArte[] | undefined
> {
  try {
    const response = await fetch(
      "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Aves%20tropicales",
      {
        headers: {
          apikey: apikey,
          authorization: authorization,
        },
      }
    );

    const data = (await response.json()) as CatGaleriaArte[];
    return data;
  } catch (error) {
    console.error("Error fetching Aves Tropicales:", error);
  }
}

export async function getFiguraHumana(): Promise<CatGaleriaArte[] | undefined> {
  try {
    const response = await fetch(
      "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Figura%20humana",
      {
        headers: {
          apikey: apikey,
          authorization: authorization,
        },
      }
    );

    const data = (await response.json()) as CatGaleriaArte[];
    return data;
  } catch (error) {
    console.error("Error fetching Figura Humana:", error);
  }
}

export async function getCorredorDeLasMascaras(): Promise<
  CatGaleriaArte[] | undefined
> {
  try {
    const response = await fetch(
      "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Corredor%20de%20las%20máscaras",
      {
        headers: {
          apikey: apikey,
          authorization: authorization,
        },
      }
    );

    const data = (await response.json()) as CatGaleriaArte[];
    return data;
  } catch (error) {
    console.error("Error fetching Corredor de las máscaras", error);
  }
}

export async function getLolSaasil(): Promise<CatGaleriaArte[] | undefined> {
  try {
    const response = await fetch(
      "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Lol%20Saasil",
      {
        headers: {
          apikey: apikey,
          authorization: authorization,
        },
      }
    );

    const data = (await response.json()) as CatGaleriaArte[];
    return data;
  } catch (error) {
    console.error("Error fetching Lol Saasil", error);
  }
}

export async function getMitosYLeyendasDelMayab(): Promise<
  CatGaleriaArte[] | undefined
> {
  try {
    const response = await fetch(
      "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Mitos%20y%20leyendas%20del%20Mayab",
      {
        headers: {
          apikey: apikey,
          authorization: authorization,
        },
      }
    );

    const data = (await response.json()) as CatGaleriaArte[];
    return data;
  } catch (error) {
    console.error("Error fetching Mitos y leyendas del Mayab", error);
  }
}

export async function getMujerMaya(): Promise<CatGaleriaArte[] | undefined> {
  try {
    const response = await fetch(
      "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Mujer%20maya",
      {
        headers: {
          apikey: apikey,
          authorization: authorization,
        },
      }
    );

    const data = (await response.json()) as CatGaleriaArte[];
    return data;
  } catch (error) {
    console.error("Error fetching Mujer Maya", error);
  }
}

export async function getPalaDeLasMariposas(): Promise<
  CatGaleriaArte[] | undefined
> {
  try {
    const response = await fetch(
      "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Palapa%20de%20las%20mariposas",
      {
        headers: {
          apikey: apikey,
          authorization: authorization,
        },
      }
    );

    const data = (await response.json()) as CatGaleriaArte[];
    return data;
  } catch (error) {
    console.error("Error fetching Palapa de las Mariposas", error);
  }
}

export async function getPitahayasDeAdolfo(): Promise<
  CatGaleriaArte[] | undefined
> {
  try {
    const response = await fetch(
      "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Pitahayas%20de%20Adolfo",
      {
        headers: {
          apikey: apikey,
          authorization: authorization,
        },
      }
    );

    const data = (await response.json()) as CatGaleriaArte[];
    return data;
  } catch (error) {
    console.error("Error fetching Pitahayas De Adolfo", error);
  }
}
