import * as React from 'react'

export const useComponentSelfRegistration = ({ component, useContext, index: customIndex }) => {
  const [registeredComponents, setRegisteredComponents] = useContext()

  const naturalIndex = registeredComponents.findIndex((registeredComponent) => {
    return component.element === registeredComponent.element;
  });
  const index = customIndex ?? naturalIndex;

  React.useEffect(() => {
    const { element } = component
    const currentElement = element.current
    if (!currentElement) return

    setRegisteredComponents((previousRegisteredComponents) => {
      const isRegistered = previousRegisteredComponents.some(
        (registeredComponent) =>
          component.element === registeredComponent.element
      );
      if (isRegistered) return previousRegisteredComponents;

      return [
        ...previousRegisteredComponents,
        {
          ...component,
          index
        }
      ];
    });

    return () => {
      setRegisteredComponents((previousRegisteredComponents) =>
        previousRegisteredComponents.filter((registeredComponent) => registeredComponent.element === element)
      )
    }
  }, [
    component,
    index,
    setRegisteredComponents,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(component),
  ])

  return index
}
