import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IRenderMimeRegistry } from '@jupyterlab/rendermime';

import { requestAPI } from './handler';
import { WidgetRenderer } from './WidgetRenderer';

/**
 * The mime type for a widget view.
 */
export const WIDGET_VIEW_MIMETYPE = 'application/vnd.simlin-view+json';

/**
 * The mime type for widget state data.
 */
export const WIDGET_STATE_MIMETYPE = 'application/vnd.simlin-state+json';

/**
 * Initialization data for the jupytersd extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupytersd:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd, rendermime: IRenderMimeRegistry) => {
    debugger;
    console.log('JupyterLab extension jupytersd is activated!');

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `:ohno: jupytersd server extension appears to be missing.\n${reason}`
        );
      });

    rendermime.addFactory(
      {
        safe: false,
        mimeTypes: [WIDGET_VIEW_MIMETYPE],
        createRenderer: options => new WidgetRenderer(options)
      },
      0
    );
  },
  requires: [IRenderMimeRegistry],
};

export default extension;
