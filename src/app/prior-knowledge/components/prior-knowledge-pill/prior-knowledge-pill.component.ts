import {Component, input} from '@angular/core';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {PriorKnowledge} from '../../models/prior-knowledge.model';
import {badgeCSSClass, tooltipCSSClass} from '../../../shared/data/default-colors.data';


@Component({
  selector: 'app-prior-knowledge-pill',
  imports: [
    NgbTooltip
  ],
  templateUrl: './prior-knowledge-pill.component.html',
  styleUrl: './prior-knowledge-pill.component.scss'
})
export class PriorKnowledgePillComponent {

  public knowledge = input.required<PriorKnowledge>();
  public remark = input.required<string>();
  protected readonly badgeCSSClass = badgeCSSClass;
  protected readonly tooltipCSSClass = tooltipCSSClass;
}
