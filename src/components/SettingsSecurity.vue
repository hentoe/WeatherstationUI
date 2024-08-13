<template>
  <div>
    <h2 class="text-base font-semibold leading-7 text-midnight dark:text-ice">Security</h2>
    <p class="mt-1 text-sm leading-6 text-gray-500 dark:text-steel">
      This does nothing yet. Change your password or do other security related stuff.
    </p>

    <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
      <div class="pt-6 sm:flex">
        <dt class="font-medium text-midnight dark:text-ice sm:w-64 sm:flex-none sm:pr-6">
          Password
        </dt>
        <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
          <div class="text-midnight dark:text-ice">"super secure 1234"</div>
          <button type="button" class="font-semibold text-denim dark:text-steel hover:text-ocea">
            Update
          </button>
        </dd>
      </div>
      <div class="pt-6 sm:flex">
        <dt class="font-medium text-midnight dark:text-ice sm:w-64 sm:flex-none sm:pr-6">
          Password security level
        </dt>
        <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
          <div class="text-midnight dark:text-ice">common</div>
          <button type="button" class="font-semibold text-denim dark:text-steel hover:text-ocea">
            Update
          </button>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup></script>
