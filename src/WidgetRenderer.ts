import { convertMdlToXmile } from '@system-dynamics/xmutil';
import { fromXmile } from '@system-dynamics/importer';

import { Project } from '@system-dynamics/core/datamodel';
import { renderSvgToString } from '@system-dynamics/diagram';

import { IDisposable } from '@lumino/disposable';

import { Panel } from '@lumino/widgets';

import { IRenderMime } from '@jupyterlab/rendermime-interfaces';

export class WidgetRenderer extends Panel
  implements IRenderMime.IRenderer, IDisposable {
  constructor(options: IRenderMime.IRendererOptions) {
    super();
    this.mimeType = options.mimeType;
  }

  async renderModel(mimeModel: IRenderMime.IMimeModel): Promise<void> {
    const source: any = mimeModel.data[this.mimeType];

    let contents = source['project_source'];

    if (source['project_id'].endsWith('.mdl')) {
      contents = await convertMdlToXmile(contents, false);
    }

    const pb = await fromXmile(contents);
    const project = Project.deserializeBinary(pb);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [svg, _viewBox] = await renderSvgToString(project, 'main');

    // Let's be optimistic, and hope the widget state will come later.
    this.node.textContent = svg;

    // If there is no model id, the view was removed, so hide the node.
    if (source.model_id === '') {
      this.hide();
      return;
    }
  }

  dispose(): void {
    super.dispose();
    // TODO: finalize react-y stuff?
  }

  /**
   * The mimetype being rendered.
   */
  readonly mimeType: string;
}
