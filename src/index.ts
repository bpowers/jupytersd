import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';

import { requestAPI } from './handler';

/**
 * Initialization data for the jupytersd extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupytersd:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd, widgets: any) => {
    debugger;
    console.log('JupyterLab extension jupytersd is activated!');

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The jupytersd server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default extension;
