import { mount } from "cypress/react18";
import React from 'react';
import { CustomInput } from "@/jobApp/components/Common/CustomInput"

describe('<CustomInput />', () => {


    it('renders the input with correct type and placeholder', () => {
        const baseProps = {
            type: 'text' as const,
            name: 'testInput',
            onChange: cy.spy().as('onChangeSpy'),
            value: '',
        };
        mount(<CustomInput {...baseProps} placeHolder="Enter text" />);
        cy.get('input').should('have.attr', 'type', 'text');
        cy.get('input').should('have.attr', 'placeholder', 'Enter text');
    });

    it('calls onChange when input value changes', () => {
        const baseProps = {
            type: 'text' as const,
            name: 'testInput',
            onChange: cy.spy().as('onChangeSpy'),
            value: '',
        };
        mount(<CustomInput {...baseProps} />);
        cy.get('input').type('Hello');
        cy.get('@onChangeSpy').should('have.been.called');
    });

    it('displays error message when error prop is provided', () => {
        const baseProps = {
            type: 'text' as const,
            name: 'testInput',
            onChange: cy.spy().as('onChangeSpy'),
            value: '',
        };
        mount(<CustomInput {...baseProps} error="This is an error" />);
        cy.get('span').should('contain.text', 'This is an error');
    });

    it('applies disabled attribute when disabled prop is true', () => {
        const baseProps = {
            type: 'text' as const,
            name: 'testInput',
            onChange: cy.spy().as('onChangeSpy'),
            value: '',
        };
        mount(<CustomInput {...baseProps} disabled={true} />);
        cy.get('input').should('be.disabled');
    });

    it('applies custom classes passed via className prop', () => {
        const baseProps = {
            type: 'text' as const,
            name: 'testInput',
            onChange: cy.spy().as('onChangeSpy'),
            value: '',
        };
        mount(<CustomInput {...baseProps} className="custom-class" />);
        cy.get('input').should('have.class', 'custom-class');
    });
});
