import AnnotationSystem from "./ApiTecnica/annotations";
import ApiActions from "./ApiTecnica/apiactions";
import AssistSystem from "./ApiTecnica/assists";
import DirectiveSystem from "./ApiTecnica/directives";
import CursesGroupSystem from "./ApiTecnica/groups";
import PreferencesSystem from "./ApiTecnica/preferences";
import { RecordSystem } from "./ApiTecnica/records";
import StudentSystem from "./ApiTecnica/student";
import { keyCodeAdmin } from "./SecurityKeyCodes";

const urlBase: string = 'https://tecnicadigital.com.ar';

const Student = new StudentSystem(urlBase, keyCodeAdmin);
const Directive = new DirectiveSystem(urlBase, keyCodeAdmin);
const Assist = new AssistSystem(urlBase, keyCodeAdmin);
const Annotation = new AnnotationSystem(urlBase, keyCodeAdmin);
const Records = new RecordSystem(urlBase, keyCodeAdmin);
const Actions = new ApiActions();
const Prefences = new PreferencesSystem(urlBase, keyCodeAdmin);
const Groups = new CursesGroupSystem(urlBase, keyCodeAdmin);

export {
    Student,
    Directive,
    urlBase,
    Assist,
    Annotation,
    Actions,
    Records,
    Prefences,
    Groups
};