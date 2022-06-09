import useUserApi from '@/api/modules/user';
import useGetQueryComposable from './getQuery.composable';

// eslint-disable-next-line import/prefer-default-export
export default function useUsuariosComposable() {
  const { pagination, paginate, order, where, fields, include, getFilterObject } = useGetQueryComposable();
  const resource = useUserApi();
  const loading = ref(false);
  const lista = ref([]);
  const getLista = async () => {
    loading.value = true;
    const query = getFilterObject();
    const respCount = await resource
      .count(query)
      .then(({ data }) => data)
      .catch(() => false);
    pagination.value.total = respCount.count;
    const respLista = await resource
      .list(query)
      .then(({ data }) => data)
      .catch(() => false);
    lista.value = respLista;
    loading.value = false;
    return respLista;
  };
  const onChangePage = (page: number) => {
    pagination.value.page = page;
    getLista();
  };

  const onChangeLimit = (limit: number) => {
    pagination.value.limit = limit;
    pagination.value.page = 1;
    getLista();
  };

  const onSort = (sort: string | string[]) => {
    order.value = sort;
    getLista();
  };

  const getById = async (id: number | string) => {
    const respCreate = await resource
      .getById(id)
      .then(({ data }) => data)
      .catch(() => false);
    return respCreate;
  };

  const create = async (newData: any, refreshList = false) => {
    const respCreate = await resource
      .create(newData)
      .then(({ data }) => data)
      .catch(() => false);
    if (respCreate) {
      if (refreshList) getLista();
    }
    return respCreate;
  };

  const update = async (id: number | string, updateData: any, refreshList = false) => {
    const respUpdate = await resource
      .update(id, updateData)
      .then(({ data }) => data)
      .catch(() => false);
    if (respUpdate) {
      if (refreshList) getLista();
    }
    return respUpdate;
  };

  const changePassword = async (id: number | string, dataPass: { password: string }) => {
    const respUpdate = await resource
      .update(id, dataPass)
      .then(({ data }) => data)
      .catch(() => false);
    return respUpdate;
  };

  return {
    pagination,
    paginate,
    order,
    where,
    fields,
    include,
    lista,
    loading,
    resource,
    getLista,
    onChangePage,
    onChangeLimit,
    onSort,
    getById,
    create,
    update,
    changePassword,
  };
}
