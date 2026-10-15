import divisionsData from 'bangladesh-geojson/divisions';
import districtsData from 'bangladesh-geojson/districts';
import upazilasData from 'bangladesh-geojson/upazilas';
import postcodesData from 'bangladesh-geojson/postcodes';
import dhakaData from 'bangladesh-geojson/dhaka-city';

export const divisions = divisionsData?.divisions || [];
export const districts = districtsData?.districts || [];
export const upazilas = upazilasData?.upazilas || [];
export const postcodes = postcodesData?.postcodes || [];
export const dhakaAreas = dhakaData?.dhaka || [];

export function getDivisions() {
  return divisions;
}

export function getDivisionById(id) {
  return divisions.find((d) => String(d.id) === String(id));
}

export function getDistricts() {
  return districts;
}

export function getDistrictById(id) {
  return districts.find((d) => String(d.id) === String(id));
}

export function getDistrictsByDivision(divisionId) {
  return districts.filter((d) => String(d.division_id) === String(divisionId));
}

export function getUpazilas() {
  return upazilas;
}

export function getUpazilaById(id) {
  return upazilas.find((u) => String(u.id) === String(id));
}

export function getUpazilasByDistrict(districtId) {
  return upazilas.filter((u) => String(u.district_id) === String(districtId));
}

export function getPostcodes() {
  return postcodes;
}

export function getPostcodesByDistrict(districtId) {
  return postcodes.filter((p) => String(p.district_id) === String(districtId));
}

export function getDhakaAreas() {
  return dhakaAreas;
}

export function searchGeo(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return [];

  const results = [];
  const matches = (s) => Boolean(s && s.toLowerCase().includes(q));

  for (const d of divisions) {
    if (matches(d.name) || matches(d.bn_name)) {
      results.push({ type: 'division', label: `${d.name} (${d.bn_name})`, data: d });
    }
  }

  for (const d of districts) {
    if (matches(d.name) || matches(d.bn_name)) {
      const parentDiv = getDivisionById(d.division_id);
      results.push({
        type: 'district',
        label: `${d.name} (${d.bn_name})`,
        sublabel: parentDiv ? `Division: ${parentDiv.name}` : '',
        data: d,
      });
    }
  }

  for (const u of upazilas) {
    if (matches(u.name) || matches(u.bn_name)) {
      const parentDist = getDistrictById(u.district_id);
      results.push({
        type: 'upazila',
        label: `${u.name} (${u.bn_name})`,
        sublabel: parentDist ? `District: ${parentDist.name}` : '',
        data: u,
      });
    }
  }

  for (const p of postcodes) {
    if (matches(p.postOffice) || matches(p.upazila) || matches(p.postCode)) {
      results.push({
        type: 'postcode',
        label: `${p.postOffice} - ${p.postCode}`,
        sublabel: `Upazila: ${p.upazila}`,
        data: p,
      });
    }
  }

  return results.slice(0, 100);
}

export function getFullHierarchy() {
  return divisions.map((division) => {
    const divDistricts = districts
      .filter((d) => String(d.division_id) === String(division.id))
      .map((district) => ({
        ...district,
        upazilas: upazilas.filter((u) => String(u.district_id) === String(district.id)),
      }));
    return { ...division, districts: divDistricts };
  });
}
