import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      landing: {
        hero: {
          badge: "v1.0 is now live",
          title_part1: "Master your workflow",
          title_part2: "with crystal clarity",
          subtitle: "TaskForge brings a new level of elegance to task management. Organize, track, and complete your goals in a distraction-free environment designed for focus.",
          cta_primary: "Start for free",
          cta_secondary: "Live Demo",
          cta_dashboard: "Go to Dashboard"
        },
        features: {
          title: "Everything you need",
          subtitle: "Powerful features wrapped in a beautiful interface",
          glassmorphism_title: "Glassmorphism UI",
          glassmorphism_desc: "A modern, aesthetic interface that keeps you focused and reduces eye strain.",
          auth_title: "Secure Authentication",
          auth_desc: "Enterprise-grade security with JWT, Google, and GitHub integration.",
          realtime_title: "Real-time Updates",
          realtime_desc: "Instant interactions and state management for a seamless experience."
        },
        tech_stack: {
          title: "Powered by modern tech stack"
        },
        footer: {
          rights: "© 2025 TaskForge. All rights reserved.",
          privacy: "Privacy",
          terms: "Terms"
        },
        navbar: {
          sign_in: "Sign In",
          get_started: "Get Started",
          dashboard: "Go to Dashboard"
        }
      },
      layout: {
        welcome_back: "Welcome back",
        sign_out: "Sign Out"
      },
      dashboard: {
        my_tasks: "My Tasks",
        manage_tasks: "Manage your daily goals and projects",
        new_task: "New Task",
        no_tasks: "No tasks yet",
        create_first_task: "You haven't created any tasks yet. Start by adding a new task to organize your day.",
        create_task: "Create Task",
        create_new_task: "Create New Task",
        edit_task: "Edit Task",
        delete_task_title: "Delete Task",
        save_changes: "Save Changes",
        confirm_delete: "Are you sure you want to delete this task? This action cannot be undone.",
        title: "Title",
        title_placeholder: "What needs to be done?",
        description: "Description",
        description_placeholder: "Add details (optional)",
        cancel: "Cancel",
        save: "Save",
        edit: "Edit",
        delete: "Delete",
        close: "Close",
        messages: {
          fetch_error: "Failed to fetch tasks",
          fetch_error_generic: "An error occurred while fetching tasks",
          create_success: "Task created successfully",
          create_error: "Failed to create task",
          update_success: "Task updated successfully",
          update_error: "Failed to update task",
          delete_success: "Task deleted successfully",
          delete_error: "Failed to delete task",
          status_error: "Failed to update task status"
        }
      }
    }
  },
  es: {
    translation: {
      landing: {
        hero: {
          badge: "v1.0 ya está disponible",
          title_part1: "Domina tu flujo de trabajo",
          title_part2: "con claridad cristalina",
          subtitle: "TaskForge lleva la gestión de tareas a un nuevo nivel de elegancia. Organiza, sigue y completa tus objetivos en un entorno libre de distracciones diseñado para el enfoque.",
          cta_primary: "Empieza gratis",
          cta_secondary: "Demo en vivo",
          cta_dashboard: "Ir al Panel"
        },
        features: {
          title: "Todo lo que necesitas",
          subtitle: "Potentes características envueltas en una hermosa interfaz",
          glassmorphism_title: "Interfaz Glassmorphism",
          glassmorphism_desc: "Una interfaz moderna y estética que te mantiene enfocado y reduce la fatiga visual.",
          auth_title: "Autenticación Segura",
          auth_desc: "Seguridad de grado empresarial con integración de JWT, Google y GitHub.",
          realtime_title: "Actualizaciones en tiempo real",
          realtime_desc: "Interacciones instantáneas y gestión de estado para una experiencia fluida."
        },
        tech_stack: {
          title: "Impulsado por un stack tecnológico moderno"
        },
        footer: {
          rights: "© 2025 TaskForge. Todos los derechos reservados.",
          privacy: "Privacidad",
          terms: "Términos"
        },
        navbar: {
          sign_in: "Iniciar Sesión",
          get_started: "Empezar",
          dashboard: "Ir al Panel"
        }
      },
      layout: {
        welcome_back: "Bienvenido de nuevo",
        sign_out: "Cerrar Sesión"
      },
      dashboard: {
        my_tasks: "Mis Tareas",
        manage_tasks: "Gestiona tus objetivos diarios y proyectos",
        new_task: "Nueva Tarea",
        no_tasks: "No hay tareas aún",
        create_first_task: "Aún no has creado ninguna tarea. Empieza añadiendo una nueva tarea para organizar tu día.",
        create_task: "Crear Tarea",
        create_new_task: "Crear Nueva Tarea",
        edit_task: "Editar Tarea",
        delete_task_title: "Eliminar Tarea",
        save_changes: "Guardar Cambios",
        confirm_delete: "¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se puede deshacer.",
        title: "Título",
        title_placeholder: "¿Qué necesitas hacer?",
        description: "Descripción",
        description_placeholder: "Añadir detalles (opcional)",
        cancel: "Cancelar",
        save: "Guardar",
        edit: "Editar",
        delete: "Eliminar",
        close: "Cerrar",
        messages: {
          fetch_error: "Error al obtener tareas",
          fetch_error_generic: "Ocurrió un error al obtener tareas",
          create_success: "Tarea creada exitosamente",
          create_error: "Error al crear tarea",
          update_success: "Tarea actualizada exitosamente",
          update_error: "Error al actualizar tarea",
          delete_success: "Tarea eliminada exitosamente",
          delete_error: "Error al eliminar tarea",
          status_error: "Error al actualizar estado de tarea"
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
