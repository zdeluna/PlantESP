import React from 'react';
import renderer from 'react-test-renderer';
import {Image} from 'react-native';
import {Icon} from '../Icon.js';
import {PLANT_ICON} from '../../src/images';

jest.useFakeTimers();

describe('Icon', () => {
    let testRenderer = renderer.ReactTestRenderer;
    testRenderer = renderer.create(<Icon source={PLANT_ICON} />);

    it('renders an image', () => {
        const image = testRenderer.root.findByType(Image);
    });
});
