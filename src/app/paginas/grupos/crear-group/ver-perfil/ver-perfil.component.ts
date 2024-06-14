import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HabilidadService } from '../../../../services/habilidad.service';
import { Habilidad, Hobby, InfoDTO, Curso } from '../../../../models/model';
import { HobbyService } from '../../../../services/hobby.service';
import { PerfilService } from '../../../../services/perfil.service';
import { CursoService } from '../../../../services/curso/curso.service';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent implements OnInit {
  habilidades: Habilidad[] = [];
  hobbies: Hobby[] = [];
  cursos: Curso[] = [];
  descripcion: string = '';
  informacion: string = '';
  nombres: string = '';
  ap_paterno: string = '';
  ap_materno: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { codigoPersona: string },
    private habilidadService: HabilidadService,
    private hobbyService: HobbyService,
    private perfilService: PerfilService,
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {
    const codigoPersona = this.data.codigoPersona;

    this.habilidadService.getHabilidades(codigoPersona).subscribe(habilidades => this.habilidades = habilidades);
    this.hobbyService.getHobbies(codigoPersona).subscribe(hobbies => this.hobbies = hobbies);
    this.perfilService.getInfo(codigoPersona).subscribe((info: InfoDTO) => {
      this.descripcion = info.descripcion;
      this.informacion = info.infoAdicional;
      this.nombres = info.nombres;
      this.ap_paterno = info.ap_paterno;
      this.ap_materno = info.ap_materno;
    });
    this.cursoService.getCursosByCod(codigoPersona).subscribe(cursos => this.cursos = cursos);
  }
}
