import _ from 'lodash/fp.js';
import { escape } from './util.js';
import { parameterizeText } from '../parameterize.js';
import { log } from '../logger.js';

export const generateTests = (steps,parameterMap,extraIndent) => {
    log.debug('generateTests steps : '+JSON.stringify(steps));
    const indent = extraIndent ? extraIndent : '';
    let tests = `
${indent}    var state = {};`;
    
    _.forEach((step) => {
        const parameterizedText = ( parameterMap ? parameterizeText(step.text,parameterMap) : step.text);
        const name = parameterizedText;
        const parameterizedStep = _.set('text',parameterizedText,step);

        const stepString = JSON.stringify(parameterizedStep);
        tests = tests+`
${indent}    test('${escape(step.type.name)} ${escape(name)}', () => { state = Test(state,${stepString}); });`;
    },steps);

    return tests;
};
