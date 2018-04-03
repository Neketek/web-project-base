class ClassIntegration:

    __CLASS_INTEGRATION_CLASSES_LIST__ = ()

    def __class_integration_classes_list__(self):
        return self.__class__.__CLASS_INTEGRATION_CLASSES_LIST__

    def __class_integration_kwargs__(self, cls):
        return dict()

    def __class_integration_args__(self, cls):
        return list()

    def __class_integration_intergrate__(self, cls):

        def caller():
            return cls(
                *self.__class_integration_args__(cls),
                **self.__class_integration_kwargs__(cls)
            )
        self.__setattr__(cls.__name__, caller)

    def __class_integration_integrate_all__(self):
        for cls in self.__class_integration_classes_list__():
            self.__class_integration_intergrate__(cls)
