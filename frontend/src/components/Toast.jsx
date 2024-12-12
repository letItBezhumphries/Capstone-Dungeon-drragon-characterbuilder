import { toast } from 'react-toastify';

export const SpellAddedToast = (spell, class_type) => {
  toast.success(
    `Spell Added ! \nAdded the ${spell} spell to your ${class_type}`,
    {
      position: 'bottom-center',
    }
  );
};

export const SpellRemovedToast = (spell, class_type) => {
  toast.success(
    `Spell Removed ! \nRemovedthe ${spell} spell from your ${class_type}`,
    {
      position: 'bottom-center',
    }
  );
};

export const SpellSlotNotAvailableToast = (spell, class_type) => {
  toast.error(
    `Unable to add the spell ${spell} to your ${class_type}. No spell slots are available. You must first remove a spell of equal level before adding another spell`,
    {
      position: 'bottom-center',
    }
  );
};
