const API = <T>(entityName: string) => {
  /**
   * Get a list of entities
   * @returns {Promise<T[]>}
   * @example
   * const entities = await API.getPaginated(1, 10);
   *
   **/
  const getPaginated = async <T>(
    page: number,
    perPage: number = 10
  ): Promise<{
    meta: {
      total: number;
      page: number;
      perPage: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
    data: T[];
  }> => {
    const response = await fetch(
      `/api/blocksweb/records/${entityName}/paginate?page=${page}&perPage=${perPage}`
    ).catch((error) => {
      return Promise.reject(error);
    });

    const json = await response.json();
    const result = {
      meta: {
        hasNext: json.meta.hasNext !== null,
        hasPrev: json.meta.hasPrev !== null,
        page: json.meta.page,
        perPage: json.meta.perPage,
        total: json.meta.total,
      },
      data: json.data,
    };
    return result;
  };

  return {
    getPaginated,
  };
};

export default API;
