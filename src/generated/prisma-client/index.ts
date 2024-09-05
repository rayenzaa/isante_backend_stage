import { Utilisateur as _Utilisateur } from './utilisateur';
import { RendezVous as _RendezVous } from './rendez_vous';
import { Notification as _Notification } from './notification';
import { Medicament as _Medicament } from './medicament';
import { Ordonnance as _Ordonnance } from './ordonnance';
import { LigneOrdonnance as _LigneOrdonnance } from './ligne_ordonnance';
import { Log as _Log } from './log';

export namespace PrismaModel {
  export class Utilisateur extends _Utilisateur {}
  export class RendezVous extends _RendezVous {}
  export class Notification extends _Notification {}
  export class Medicament extends _Medicament {}
  export class Ordonnance extends _Ordonnance {}
  export class LigneOrdonnance extends _LigneOrdonnance {}
  export class Log extends _Log {}

  export const extraModels = [
    Utilisateur,
    RendezVous,
    Notification,
    Medicament,
    Ordonnance,
    LigneOrdonnance,
    Log,
  ];
}
