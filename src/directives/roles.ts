/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useAuth from '@/store/auth';

export default {
  beforeMount: (el: any, binding: { value: string | Array<string> }, vnode: any) => {
    const auth = useAuth();
    console.log('directive', binding.value);
    const validate = (rol?: string) => {
      if (!rol) {
        vnode.el.style.display = 'none';
      } else if (Array.isArray(binding.value)) {
        if (!binding.value.includes(rol)) vnode.el.style.display = 'none';
        else vnode.el.style.display = 'inline';
      } else if (rol === binding.value) vnode.el.style.display = 'none';
      else vnode.el.style.display = 'inline';
    };
    auth.$subscribe((m, s) => validate(s.user?.rol));
    validate(auth.user?.rol);
  },
};
