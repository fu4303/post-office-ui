import { mount, shallow } from 'enzyme';
import React from 'react';
import Shipment from './index';

const spy = jest.fn();

describe('MovieList Component Testing', () => {
  let ShipmentWrapper,
    ShipmentData,
    wrapper;
  beforeEach(() => {
    ShipmentData = {
      classes:{
        root: "ShipmentsTable-root-253",
      },
      className:'Container-item-2',
      isLoading: 'true',
      shipments: [{
        _id: '5d18f2f39d3a34d80788c7a2',
        name: 'Mac Book Laptop',
        postoffice: 'Tobalaba',
        type: 'Package',
        weight: 'More than 5kg',
        status: 'IN_TRANSIT',
        trackingId: 'DES1561916147320',
        createdAt: '2019-06-30T17:35:47.328Z',
        updatedAt: '2019-06-30T17:35:47.328Z',
        __v: 0
      }],
      totalShipments: 3,
      updateShipmentsHandler: spy,
      deleteShipmentsHandler: spy,
      createShipmentsHandler: spy
    };
  });

  it('render the snapshot', () => {
    const tree = shallow(<Shipment {...ShipmentData}/>);
    expect(tree).toMatchSnapshot()

  });
  it('render the component without crashing', () => {
    wrapper = shallow(<Shipment {...ShipmentData}/>);
    expect(wrapper.exists()).toBe(true);
  });

});