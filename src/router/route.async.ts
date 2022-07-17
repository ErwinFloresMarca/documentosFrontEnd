// 需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';

import PhHouseLine from '~icons/ph/house-line';
import PhUserCircleGear from '~icons/ph/user-circle-gear';
import PhBuildings from '~icons/ph/buildings';
import PhTagChevron from '~icons/ph/tag-chevron';
import PhFiles from '~icons/ph/files';
import PhTextbox from '~icons/ph/textbox';
import PhListNumbers from '~icons/ph/list-numbers';
import PhFileText from '~icons/ph/file-text';

export const adminRoute: RouteRecordRaw = {
  path: '/admin',
  name: 'Admin',
  redirect: '/admin/home',
  meta: {
    title: 'Admin',
    // phIcon: '',
    elSvgIcon: 'Tools',
  },
  component: () => import('@/layouts/admin/index.vue'),
  children: [
    {
      path: 'home',
      name: 'Home',
      meta: {
        title: 'Home',
        icon: PhHouseLine,
        // elSvgIcon: '',
        hidden: false,
        auth: true,
      },
      component: () => import('@/pages/admin/home.page.vue'),
    },
    {
      path: 'usuarios',
      name: 'Usuarios',
      meta: {
        title: 'Usuarios',
        icon: PhUserCircleGear,
        // elSvgIcon: '',
        hidden: false,
        auth: true,
        roles: ['admin'],
      },
      component: () => import('@/pages/admin/usuarios.page.vue'),
    },
    {
      path: 'documentos',
      name: 'Documentos',
      redirect: '/admin/documentos/list',
      meta: {
        title: 'Documentos',
        icon: PhFileText,
        // elSvgIcon: '',
        hidden: false,
        auth: true,
      },
      component: () => import('@/pages/admin/documentos/index.page.vue'),
      children: [
        {
          path: 'list',
          name: 'DocumentosList',
          meta: {
            title: 'Documentos',
            icon: PhFileText,
            // elSvgIcon: '',
            hidden: false,
            auth: true,
          },
          component: () => import('@/pages/admin/documentos/documentos.page.vue'),
        },
        {
          path: 'nueva',
          name: 'NuevaDocumento',
          meta: {
            title: 'Nueva Documento',
            hidden: true,
            auth: true,
          },
          component: () => import('@/pages/admin/documentos/nuevo.page.vue'),
        },
        {
          path: 'editar/:id',
          name: 'EditDocumento',
          meta: {
            title: 'Editar Documento',
            hidden: true,
            auth: true,
          },
          component: () => import('@/pages/admin/documentos/edit.page.vue'),
        },
        {
          path: 'ver/:id',
          name: 'ViewDocumento',
          meta: {
            title: 'Ver Documento',
            hidden: true,
            auth: true,
          },
          component: () => import('@/pages/admin/documentos/view.page.vue'),
        },
      ],
    },
    {
      path: 'areas',
      name: 'Areas',
      meta: {
        title: 'Areas',
        icon: PhBuildings,
        // elSvgIcon: '',
        hidden: false,
        auth: true,
        roles: ['admin', 'secretario', 'director'],
      },
      component: () => import('@/pages/admin/areas.page.vue'),
    },
    {
      path: 'catalogos',
      name: 'Catalogos',
      meta: {
        title: 'Catalogos',
        icon: PhTagChevron,
        // elSvgIcon: '',
        hidden: false,
        auth: true,
        roles: ['admin', 'secretario', 'director'],
      },
      component: () => import('@/pages/admin/catalogos/index.page.vue'),
      children: [
        {
          path: 'tipo-documentos',
          name: 'TipoDocumentos',
          meta: {
            title: 'Tipo de Documentos',
            icon: PhFiles,
            // elSvgIcon: '',
            hidden: false,
            auth: true,
            roles: ['admin', 'secretario', 'director'],
          },
          component: () => import('@/pages/admin/catalogos/tipo-documentos.page.vue'),
        },
        {
          path: 'campos',
          name: 'Campos',
          meta: {
            title: 'Campos',
            icon: PhTextbox,
            // elSvgIcon: '',
            hidden: false,
            auth: true,
            roles: ['admin', 'secretario', 'director'],
          },
          component: () => import('@/pages/admin/catalogos/campos.page.vue'),
        },
        {
          path: 'tipo',
          name: 'TipoCatalogo',
          meta: {
            title: 'Tipo de Catalogo',
            icon: PhListNumbers,
            hidden: false,
            // elSvgIcon: '',
            auth: true,
            roles: ['admin', 'secretario', 'director'],
          },
          component: () => import('@/pages/admin/catalogos/list-catalogos.page.vue'),
        },
      ],
    },
  ],
};

const asyncRoutes: Array<RouteRecordRaw> = [
  adminRoute,
  // {
  //   path: '/',
  //   name: 'home',
  //   meta: {
  //     title: '',
  //     icon: '',
  //   },
  //   component: () => import('@/views/home/index.vue'),
  // },
  // {
  //   path: '/process',
  //   name: 'process',
  //   meta: {
  //     title: 'Template configuration process',
  //     icon: '',
  //   },
  //   component: () => import('@/views/example/MarkdownPage.vue'),
  // },
];

export default asyncRoutes;
