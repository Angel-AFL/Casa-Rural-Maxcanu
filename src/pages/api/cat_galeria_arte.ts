import type { CatGaleriaArte } from "../../types/global";

const apikey = import.meta.env.SUPABASE_KEY;
const authorization = `Bearer ${import.meta.env.SUPABASE_KEY}`;

const getArtsData = async (
  url: string
): Promise<CatGaleriaArte[] | undefined> => {
  try {
    const response = await fetch(url, {
      headers: {
        apikey,
        authorization: authorization,
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }

    const data = (await response.json()) as CatGaleriaArte[];
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export function getAvesTropicales() {
  return getArtsData(
    "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Aves%20tropicales"
  );
}

export function getFiguraHumana() {
  return getArtsData(
    "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Figura%20humana"
  );
}

export function getCorredorDeLasMascaras() {
  return getArtsData(
    "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Corredor%20de%20las%20máscaras"
  );
}

export function getLolSaasil() {
  return getArtsData(
    "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Lol%20Saasil"
  );
}

export function getMitosYLeyendasDelMayab() {
  return getArtsData(
    "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Mitos%20y%20leyendas%20del%20Mayab"
  );
}

export function getCocina() {
  return getArtsData(
    "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Cocina"
  );
}

export function getComedor() {
  return getArtsData(
    "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Comedor"
  );
}

export function getCorredorDelPozo() {
  return getArtsData(
    "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Corredor%20del%20pozo"
  );
}

export function getMujerMaya() {
  return getArtsData(
    "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Mujer%20maya"
  );
}

export function getPalapaDeLasMariposas() {
  return getArtsData(
    "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Palapa%20de%20las%20mariposas"
  );
}

export function getPasilloDeLaPLantaBaja() {
  return getArtsData(
    "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Pasillo%20de%20planta%20baja"
  );
}

export function getPitahayasDeAdolfo() {
  return getArtsData(
    "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Pitahayas%20de%20Adolfo"
  );
}

export function getPitahaysDragonFruit() {
  return getArtsData(
    "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Pitahayas-Dragon%20fruit"
  );
}

export function getPlantasFloresYFrutos() {
  return getArtsData(
    "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Plantas,%20flores%20y%20frutos"
  );
}

export function getRetratos() {
  return getArtsData(
    "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Retratos"
  );
}

export function getVarios() {
  return getArtsData(
    "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Varias"
  );
}
